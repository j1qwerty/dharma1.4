import React, { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WhatsappLogo } from "@phosphor-icons/react";
import BookingFrame from "../components/common/BookingFrame";
import SafeImage from "../components/common/SafeImage";
import { CheckCircle, LockKey } from "../components/common/Icons";
import { useBooking, buildBookingWhatsAppHref } from "../lib/booking";
import { useAuth } from "../lib/auth";
import { logBooking } from "../lib/cmsAdmin";
import { pujas as defaultPujas } from "../lib/data";
import { useLivePujas } from "../lib/cms";
import { useLanguage } from "../components/common/LanguageToggle";

export default function BookingPayment() {
  const { booking } = useBooking();
  const { user } = useAuth();
  const { id } = useParams();
  const nav = useNavigate();
  const { t, lang } = useLanguage();
  // Cache-first: render hardcoded pujas instantly, then refresh from Firestore
  // in the background when published overrides arrive.
  const { items: livePujas } = useLivePujas();
  const p = useMemo(
    () =>
      livePujas.find((x) => x.id === (id || booking.pujaId)) ||
      defaultPujas.find((x) => x.id === (id || booking.pujaId)) ||
      defaultPujas[0],
    [livePujas, id, booking.pujaId]
  );
  const effectiveBooking = { ...booking, pujaId: p.id };
  const waHref = buildBookingWhatsAppHref(effectiveBooking, lang);
  const family = Number(booking?.sankalp?.family) || 0;
  const addons = Array.isArray(booking.addons) ? booking.addons : [];
  const total = booking.packagePrice || p.price || 0;

  const rows = [
    [t("bpay.puja"), `${p.title}${p.titleHi ? " · " + p.titleHi : ""}`],
    [t("detail.temple"), p.temple],
    [t("booking.date"), booking.date],
    [t("booking.muhurat"), booking.time],
    [
      t("booking.package"),
      `${booking.package} · ₹${(booking.packagePrice || 0).toLocaleString("en-IN")}`,
    ],
    [t("bpay.addons"), addons.length ? addons.join(", ") : "—"],
    [t("bs.fullName"), booking?.sankalp?.name || "—"],
    [t("bs.gotra"), booking?.sankalp?.gotra || "—"],
    [t("bpay.purpose"), booking?.sankalp?.purpose || "—"],
    [t("bs.familyMembers"), family > 0 ? String(family) : "—"],
    [t("bpay.payment"), t("bpay.paymentMethods")],
  ];

  return (
    <BookingFrame active="payment">
      <div className="eyebrow">{t("bpay.eyebrow")}</div>
      <h2 className="font-display mt-3 text-4xl">{t("bpay.title")}</h2>

      <div className="mt-6 overflow-hidden rounded-2xl">
        <SafeImage
          src={p.image}
          alt={lang === "hi" && p.titleHi ? p.titleHi : p.title}
          className="h-48 w-full object-cover"
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span>{`${p.title}${p.titleHi ? " · " + p.titleHi : ""}`}</span>
        <span>{p.temple}</span>
      </div>

      <div className="mt-6 grid gap-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between border-b border-line py-3 text-sm gap-4">
            <span className="text-muted">{label}</span>
            <span className="font-semibold text-right max-w-[60%]">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-between border-t border-line pt-4 text-base font-bold">
        <span>{t("booking.total")}</span>
        <span>₹{total.toLocaleString("en-IN")}</span>
      </div>

      <div className="mt-7 flex items-start gap-3 rounded-2xl bg-surface-2 p-4 text-xs leading-6 text-muted">
        <LockKey size={18} className="mt-0.5 text-gold-500" />
        <span>{t("bpay.demoNote")}</span>
      </div>

      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        className="btn-whatsapp-dt mt-7"
        onClick={() => {
          // Store the booking even when the devotee continues on WhatsApp.
          logBooking({ ...effectiveBooking, lang }, user, { source: "whatsapp", status: "new" });
          // Give the WhatsApp tab a beat to open before we route to confirmation.
          setTimeout(() => nav("/booking/confirmation"), 1200);
        }}
      >
        <WhatsappLogo size={20} weight="fill" />
        {t("bpay.complete")}
      </a>

      <p className="mt-3 text-center text-[10px] muted-dt">
        {lang === "hi"
          ? "बुकिंग की पुष्टि WhatsApp पर पूर्ण विवरण के साथ भेजी जाएगी।"
          : "Your booking details will open in WhatsApp with full summary."}
      </p>
    </BookingFrame>
  );
}
