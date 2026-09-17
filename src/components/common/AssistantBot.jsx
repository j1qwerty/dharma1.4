// Floating assistant bot (bottom-right). First-party replacement for the
// removed third-party page-agent script: no external dependency, so content
// blockers can't break it and it can't take the page down with it.
// Quick actions route into booking/stories/acharyas or open WhatsApp.
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChatCircle, WhatsappLogo, X } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";
import { WHATSAPP_NUMBER } from "../../lib/site";

export default function AssistantBot() {
  const [open, setOpen] = useState(false);
  const { t, lang } = useLanguage();
  const hi = lang === "hi";
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("wa.defaultMessage"))}`;

  const quick = [
    { to: "/pujas", label: hi ? "पूजा बुक करें" : "Book a puja" },
    { to: "/stories", label: hi ? "कथाएँ पढ़ें" : "Read stories" },
    { to: "/acharyas", label: hi ? "आचार्यों से मिलें" : "Meet acharyas" },
  ];

  return (
    <div style={{ position: "fixed", right: 20, bottom: 16, zIndex: 55 }}>
      {open && (
        <div
          className="panel-dt p-5"
          style={{ width: 300, maxWidth: "calc(100vw - 40px)", marginBottom: 12, boxShadow: "0 24px 60px rgba(23,20,15,.22)" }}
          role="dialog"
          aria-label={hi ? "सहायक" : "Assistant"}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div className="eyebrow">{hi ? "नमस्ते 🙏" : "Namaste 🙏"}</div>
            <button
              onClick={() => setOpen(false)}
              aria-label={hi ? "बंद करें" : "Close"}
              style={{ cursor: "pointer", background: "transparent", border: "none", fontSize: 16, lineHeight: 1 }}
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-sm mt-2">
            {hi ? "मैं आपकी कैसे सहायता कर सकता हूँ?" : "How can I help you today?"}
          </p>
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            {quick.map((q) => (
              <Link
                key={q.to + q.label}
                to={q.to}
                onClick={() => setOpen(false)}
                className="btn-ghost-dt text-xs"
                style={{ justifyContent: "flex-start" }}
              >
                {q.label}
              </Link>
            ))}
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="btn-gold-dt text-xs"
            >
              <WhatsappLogo size={14} weight="fill" />
              {hi ? "WhatsApp पर पूछें" : "Ask on WhatsApp"}
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={hi ? "सहायक खोलें" : "Open assistant"}
        aria-expanded={open}
        className="btn-gold-dt"
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          padding: 0,
          cursor: "pointer",
          marginLeft: "auto",
          display: "grid",
          placeItems: "center",
        }}
      >
        {open ? <X size={22} /> : <ChatCircle size={24} />}
      </button>
    </div>
  );
}
