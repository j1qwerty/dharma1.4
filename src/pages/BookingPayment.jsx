import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { WhatsappLogo } from "@phosphor-icons/react";
import BookingFrame from "../components/common/BookingFrame";
import { CheckCircle, LockKey } from "../components/common/Icons";
import { useBooking, buildBookingWhatsAppHref } from "../lib/booking";
import { pujas } from "../lib/data";
import { useLanguage } from "../components/common/LanguageToggle";

export default function BookingPayment() {
  const { booking } = useBooking();
  const nav = useNavigate();
  const { t, lang } = useLanguage();
  const p = pujas.find((x) => x.id === booking.pujaId) || pujas[0];
  const waHref = buildBookingWhatsAppHref(booking, lang);
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

      <div className="mt-8 grid gap-2">
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
