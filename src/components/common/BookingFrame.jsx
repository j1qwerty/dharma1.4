import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  Package,
  UserCircle,
  Receipt,
} from "@phosphor-icons/react";
import { pujas } from "../../lib/data";
import { useBooking } from "../../lib/booking";
import { SectionDecor } from "./decor";

const steps = [
  ["date", "Date & slot", CalendarBlank],
  ["package", "Package & add-ons", Package],
  ["sankalp", "Sankalp details", UserCircle],
  ["payment", "Review & pay", Receipt],
];
export default function BookingFrame({ active, children, summary = true }) {
  const { id } = useParams();
  const { booking } = useBooking();
  const p = pujas.find((x) => x.id === id) || pujas[0];
  const activeIndex = steps.findIndex((x) => x[0] === active);
  return (
    <section className="booking-shell has-decor-dt">
      <SectionDecor />
      <div className="container-dt">
        <div className="mb-8">
          <div className="text-center text-[10px] uppercase tracking-[.17em] text-gold-600">
            Book your puja
          </div>
          <h1 className="display-dt mt-3 text-center text-5xl sm:text-6xl">{p.title}</h1>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {steps.map(([key, label, Icon], i) => (
              <div key={key} className="flex flex-col items-center gap-2 text-center">
                <div
                  className={`grid h-8 w-8 place-items-center rounded-full border ${i <= activeIndex ? "border-gold-400 bg-gold-400 text-ink-950" : "border-dt muted-dt"}`}
                >
                  <Icon size={13} />
                </div>
                <div className={`text-[9px] ${i === activeIndex ? "font-bold" : "muted-dt"}`}>
                  {label}
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
                <div className="eyebrow">{steps[activeIndex][1]}</div>
                <p className="mt-2 text-xs muted-dt">
                  Complete this part of the booking, then continue to the next screen.
                </p>
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
                <ArrowLeft size={14} /> Back
              </Link>
              {active !== "payment" && (
                <Link className="btn-gold-dt" to={`/booking/${p.id}/${steps[activeIndex + 1][0]}`}>
                  Continue <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
          {summary && (
            <aside className="panel p-6 booking-summary">
              <div className="eyebrow">Your selection</div>
              <div className="mt-5 flex gap-3">
                <img src={p.image} alt="" className="h-20 w-24 rounded-xl object-cover" />
                <div>
                  <h3 className="display-dt text-2xl">{p.title}</h3>
                  <p className="mt-1 text-[11px] muted-dt">{p.temple}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 border-t border-dt pt-5 text-xs">
                <div className="flex justify-between">
                  <span className="muted-dt">Date</span>
                  <span>{booking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="muted-dt">Muhurat</span>
                  <span>{booking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="muted-dt">Package</span>
                  <span>{booking.package}</span>
                </div>
                <div className="flex justify-between border-t border-dt pt-3 font-bold">
                  <span>Total</span>
                  <span>₹{(booking.packagePrice || p.price).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div className="mt-5 rounded-xl bg-surface-2 p-3 text-[10px] leading-5 muted-dt">
                Your details are stored with the prototype booking so the flow persists as you move
                between pages.
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
