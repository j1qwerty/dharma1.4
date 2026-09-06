import React from "react";
import BookingFrame from "../components/common/BookingFrame";
import { CalendarBlank, Clock, CheckCircle } from "../components/common/Icons";
import { useBooking } from "../lib/booking";
export default function BookingDate() {
  const { booking, update } = useBooking();
  const dates = ["Sep 09", "Sep 10", "Sep 11", "Sep 12"];
  const slots = [
    "06:00 AM - 07:00 AM",
    "07:30 AM - 08:30 AM",
    "09:00 AM - 10:00 AM",
    "11:00 AM - 12:00 PM",
    "05:30 PM - 06:30 PM",
  ];
  return (
    <BookingFrame active="date">
      <div className="eyebrow">Choose your date</div>
      <h2 className="font-display mt-3 text-4xl">Find a time that fits the ritual.</h2>
      <div className="mt-7 grid gap-7 lg:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-muted">September 2026</label>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {dates.map((x, i) => (
              <button
                key={x}
                onClick={() => update({ date: `${x}, 2026` })}
                className={`choice ${booking.date.startsWith(x) ? "active" : ""}`}
              >
                <div className="flex items-center justify-between text-xs text-muted">
                  <CalendarBlank size={15} />
                  {i === 0 ? "Closest" : ""}
                </div>
                <div className="mt-3 text-lg font-semibold">{x}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-muted">Available slots</label>
          <div className="mt-3 grid gap-2">
            {slots.map((x) => (
              <button
                key={x}
                onClick={() => update({ time: x })}
                className={`choice flex items-center justify-between ${booking.time === x ? "active" : ""}`}
              >
                <span className="text-sm">{x}</span>
                {booking.time === x && <CheckCircle size={18} className="text-gold-500" />}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-2xl bg-surface-2 p-4 text-xs text-muted">
        <Clock size={17} />
        <span>
          Muhurat and slot availability are shown before payment. Your local timezone is used in the
          booking.
        </span>
      </div>
    </BookingFrame>
  );
}
