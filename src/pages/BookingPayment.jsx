import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BookingFrame from "../components/common/BookingFrame";
import { CheckCircle, LockKey, Receipt } from "../components/common/Icons";
import { useBooking } from "../lib/booking";
export default function BookingPayment() {
  const { booking } = useBooking();
  const nav = useNavigate();
  return (
    <BookingFrame active="payment">
      <div className="eyebrow">Review & payment</div>
      <h2 className="font-display mt-3 text-4xl">Everything in one final check.</h2>
      <div className="mt-8 grid gap-2">
        {[
          ["Puja", booking.pujaId],
          ["Date", booking.date],
          ["Muhurat", booking.time],
          ["Package", booking.package],
          ["Payment", "UPI / Cards / Net banking"],
        ].map((x) => (
          <div key={x[0]} className="flex justify-between border-b border-line py-3 text-sm">
            <span className="text-muted">{x[0]}</span>
            <span className="font-semibold">{x[1]}</span>
          </div>
        ))}
      </div>
      <div className="mt-7 flex items-start gap-3 rounded-2xl bg-surface-2 p-4 text-xs leading-6 text-muted">
        <LockKey size={18} className="mt-0.5 text-gold-500" />
        <span>Demo checkout only. No real payment is processed in this prototype.</span>
      </div>
      <button onClick={() => nav("/booking/confirmation")} className="btn-gold mt-7 w-full">
        Complete booking <CheckCircle size={17} />
      </button>
    </BookingFrame>
  );
}
