import React from "react";
import BookingFrame from "../components/common/BookingFrame";
import Field from "../components/common/Field";
import { useBooking } from "../lib/booking";
import { Heart } from "../components/common/Icons";
export default function BookingSankalp() {
  const { booking, update } = useBooking();
  const set = (k, v) => update({ sankalp: { ...booking.sankalp, [k]: v } });
  return (
    <BookingFrame active="sankalp">
      <div className="eyebrow">Sankalp details</div>
      <h2 className="font-display mt-3 text-4xl">Give the ritual your name and intention.</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
        Add the details the priest needs. This prototype keeps the form simple while leaving room
        for the full Sankalp model later.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Field
          label="Full name"
          value={booking.sankalp.name}
          onChange={(e) => set("name", e.target.value)}
        />
        <Field
          label="Gotra"
          value={booking.sankalp.gotra}
          onChange={(e) => set("gotra", e.target.value)}
          helper="Choose 'I do not know' when needed."
        />
        <Field
          label="Purpose / manokamna"
          value={booking.sankalp.purpose}
          onChange={(e) => set("purpose", e.target.value)}
        />
        <Field
          label="Family members"
          type="number"
          value={booking.sankalp.family}
          onChange={(e) => set("family", Number(e.target.value))}
        />
      </div>
      <div className="mt-6 rounded-2xl bg-surface-2 p-4 text-xs leading-6 text-muted">
        <Heart size={16} className="mb-2 text-gold-500" /> Your Sankalp details are part of the
        ritual record and should only be shared with the people required to perform the seva.
      </div>
    </BookingFrame>
  );
}
