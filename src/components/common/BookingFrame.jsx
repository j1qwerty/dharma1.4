import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  Package,
  UserCircle,
  Receipt,
} from "@phosphor-icons/react";
import { pujas as defaultPujas } from "../../lib/data";
import { useLivePujas } from "../../lib/cms";
import { useBooking, buildBookingWhatsAppHref } from "../../lib/booking";
import { SectionDecor } from "./decor";
import SafeImage from "./SafeImage";
import { useLanguage } from "./LanguageToggle";

const steps = [
  ["date", "booking.dateSlot", CalendarBlank],
  ["package", "booking.packageAddons", Package],
  ["sankalp", "booking.sankalpDetails", UserCircle],
  ["payment", "booking.reviewPay", Receipt],
];
export default function BookingFrame({ active, children, summary = true }) {
  const { id } = useParams();
  const { booking, update } = useBooking();
  const { t, lang } = useLanguage();
  // Cache-first: render hardcoded pujas instantly, then refresh from Firestore
  // in the background when published overrides arrive.
  const { items: pujas } = useLivePujas();
  const p = useMemo(
    () =>
      pujas.find((x) => x.id === id) || defaultPujas.find((x) => x.id === id) || defaultPujas[0],
    [pujas, id]
  );
  // Keep stored booking in sync with the URL puja so the WhatsApp message
  // always reflects the puja the user actually selected (not stale storage).
  useEffect(() => {
    if (id && booking.pujaId !== id && pujas.some((x) => x.id === id)) {
      update({ pujaId: id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const activeIndex = steps.findIndex((x) => x[0] === active);
  const effectiveBooking = id ? { ...booking, pujaId: id } : booking;
  const waHref = buildBookingWhatsAppHref(effectiveBooking, lang);

  return (
    <section className="booking-shell has-decor-dt">
      <SectionDecor />
      <div className="container-dt">
        <div className="mb-8">
          <div className="text-center text-[10px] uppercase tracking-[.17em] text-gold-600">
            {t("booking.bookPuja")}
          </div>
          <h1 className="display-dt mt-3 text-center text-5xl sm:text-6xl">
            {lang === "hi" && p.titleHi ? p.titleHi : p.title}
          </h1>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {steps.map(([key, labelKey, Icon], i) => (
              <div key={key} className="flex flex-col items-center gap-2 text-center">
                <div
                  className={`grid h-8 w-8 place-items-center rounded-full border ${i <= activeIndex ? "border-gold-400 bg-gold-400 text-ink-950" : "border-dt muted-dt"}`}
                >
                  <Icon size={13} />
                </div>
                <div className={`text-[9px] ${i === activeIndex ? "font-bold" : "muted-dt"}`}>
                  {t(labelKey)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 progress-dt">
            {steps.map((_, i) => (
              <span className={i <= activeIndex ? "active" : ""} key={i} />
            ))}
          </div>
        </div>
        <div className="booking-grid">
          <div className="panel p-6 sm:p-8">
            <div className="flex items-start justify-between gap-5 border-b border-dt pb-5">
              <div>
                <div className="eyebrow">{t(steps[activeIndex][1])}</div>
                <p className="mt-2 text-xs muted-dt">{t("booking.completeBooking")}</p>
              </div>
              <div className="hidden text-right text-[10px] muted-dt sm:block">
                {activeIndex + 1} / {steps.length}
              </div>
            </div>
            <div className="pt-7">{children}</div>
            <div className="mt-9 flex items-center justify-between gap-3 border-t border-dt pt-5">
              <Link
                className="btn-ghost-dt"
                to={
                  active === "date"
                    ? `/pujas/${p.id}`
                    : `/booking/${p.id}/${steps[Math.max(0, activeIndex - 1)][0]}`
                }
              >
                <ArrowLeft size={14} /> {t("booking.back")}
              </Link>
              {active !== "payment" && (
                <Link className="btn-gold-dt" to={`/booking/${p.id}/${steps[activeIndex + 1][0]}`}>
                  {t("booking.continue")} <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
          {summary && (
            <aside className="panel p-6 booking-summary">
              <div className="eyebrow">{t("booking.yourSelection")}</div>
              <div className="mt-5 overflow-hidden rounded-xl">
                <SafeImage
                  src={p.image}
                  alt={lang === "hi" && p.titleHi ? p.titleHi : p.title}
                  className="h-36 w-full object-cover"
                />
              </div>
              <div className="mt-4 flex gap-3">
                <SafeImage src={p.image} alt="" className="h-20 w-24 rounded-xl object-cover" />
                <div>
                  <h3 className="display-dt text-2xl">
                    {lang === "hi" && p.titleHi ? p.titleHi : p.title}
                  </h3>
                  <p className="mt-1 text-[11px] muted-dt">{p.temple}</p>
                  {p.code && <p className="mt-1 text-[10px] muted-dt font-mono">{p.code}</p>}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <SafeImage
                  src="https://picsum.photos/seed/dharma-date/400/300"
                  alt=""
                  className="h-16 w-full rounded-lg object-cover"
                />
                <SafeImage
                  src="https://picsum.photos/seed/dharma-package/400/300"
                  alt=""
                  className="h-16 w-full rounded-lg object-cover"
                />
                <SafeImage
                  src="https://picsum.photos/seed/dharma-sankalp/400/300"
                  alt=""
                  className="h-16 w-full rounded-lg object-cover"
                />
              </div>
              <div className="mt-6 grid gap-3 border-t border-dt pt-5 text-xs">
                <div className="flex justify-between">
                  <span className="muted-dt">{t("booking.date")}</span>
                  <span>{booking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="muted-dt">{t("booking.muhurat")}</span>
                  <span>{booking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="muted-dt">{t("booking.package")}</span>
                  <span>{booking.package}</span>
                </div>
                {Array.isArray(booking.addons) && booking.addons.length > 0 && (
                  <div className="flex justify-between gap-3">
                    <span className="muted-dt">{t("bpay.addons")}</span>
                    <span className="text-right">{booking.addons.join(", ")}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-dt pt-3 font-bold">
                  <span>{t("booking.total")}</span>
                  <span>₹{(booking.packagePrice || p.price).toLocaleString("en-IN")}</span>
                </div>
              </div>
              {active === "payment" && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp-dt mt-5"
                  style={{ width: "100%" }}
                >
                  {t("bpay.complete")}
                </a>
              )}
              <div className="mt-5 rounded-xl bg-surface-2 p-3 text-[10px] leading-5 muted-dt">
                {t("booking.selectionNote")}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
