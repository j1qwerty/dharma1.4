import { useEffect, useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, firebaseConfigured } from "../../lib/firebase";
import { useSiteSettings } from "../../lib/settings";
import { Field, TextArea, TextInput, Toggle } from "../components/ui";

/* Site-wide settings (site_settings/global) — admin-writable, publicly readable. */

function SectionCard({ title, desc, children, icon }) {
  return (
    <div className="ad-card">
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {icon && (
          <div className="ad-quick-icon" style={{ width: 32, height: 32, flexShrink: 0 }}>
            {icon}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 className="ad-card-title">{title}</h2>
          {desc && <p className="ad-card-desc">{desc}</p>}
        </div>
      </div>
      <div style={{ marginTop: 18 }}>{children}</div>
    </div>
  );
}

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
  const [savedKind, setSavedKind] = useState("info");

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
      setSavedKind("success");
    } catch (e) {
      setSaved(`Save failed: ${e.message}`);
      setSavedKind("error");
    }
    setSaving(false);
  };

  const msgCls = savedKind === "success" ? "ad-msg-success"
    : savedKind === "error" ? "ad-msg-error" : "ad-msg-info";

  return (
    <div className="admin-root">
      <header className="ad-page-head">
        <div className="ad-page-head-text">
          <div className="ad-eyebrow">Settings</div>
          <h1 className="ad-page-title">Site settings</h1>
          <p className="ad-page-sub">
            Site-wide flags — login surfaces, WhatsApp number, announcement bar. Changes apply on the
            next page load for visitors.
          </p>
        </div>
        <div className="ad-page-actions">
          <button className="ad-btn ad-btn-primary" disabled={saving} onClick={save}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {saving ? "Saving…" : "Save settings"}
          </button>
        </div>
      </header>

      {!firebaseConfigured && (
        <p className="ad-msg ad-msg-warn" style={{ marginBottom: 16 }}>Firebase not configured.</p>
      )}
      {loading && <p className="ad-stat-foot">Loading current values…</p>}

      {!loading && (
        <div style={{ display: "grid", gap: 16 }}>
          <SectionCard
            title="Phone (OTP) login"
            desc="Show or hide the mobile OTP sign-in option. Each OTP costs ~$0.01 SMS (Blaze billing)."
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>
            }
          >
            <div style={{ display: "grid", gap: 10 }}>
              <Toggle
                label="Customer login (/auth/login, /auth/register)"
                desc="Show the mobile OTP option to devotees."
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
          </SectionCard>

          <SectionCard
            title="WhatsApp"
            desc="Used for booking + inquiry wa.me links across the site."
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.5 8.5 0 0 1-3.5-.7L3 21l1.7-5.4A8.5 8.5 0 1 1 21 11.5z" />
              </svg>
            }
          >
            <Field label="WhatsApp number (digits only, no +)" hint="Current code default: 9958728666.">
              <TextInput
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="9958728666"
              />
            </Field>
          </SectionCard>

          <SectionCard
            title="Announcement bar"
            desc="Thin strip above the hero (homepage_sections/announcementBar reads this)."
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l18-8v18l-18-8z" />
                <path d="M11 11v8" />
              </svg>
            }
          >
            <div style={{ display: "grid", gap: 14 }}>
              <Toggle
                label="Show announcement bar on homepage"
                desc="A thin strip above the hero section."
                value={annEnabled}
                onChange={setAnnEnabled}
              />
              <Field label="Announcement (EN)">
                <TextInput
                  value={annText}
                  onChange={(e) => setAnnText(e.target.value)}
                  placeholder="Pitru Paksha bookings open…"
                />
              </Field>
              <Field label="Announcement (HI)">
                <TextArea
                  rows={2}
                  value={annTextHi}
                  onChange={(e) => setAnnTextHi(e.target.value)}
                  placeholder="पितृ पक्ष बुकिंग खुली है…"
                />
              </Field>
            </div>
          </SectionCard>

          {saved && <p className={`ad-msg ${msgCls}`}>{saved}</p>}
        </div>
      )}
    </div>
  );
}
