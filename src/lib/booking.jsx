import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
const C = createContext(null);
const initial = {
  pujaId: "mahadeva-rudra",
  date: "Sep 09, 2026",
  time: "07:30 AM",
  package: "Family",
  packagePrice: 2100,
  addons: ["Video"],
  sankalp: { name: "Aarav Mehta", gotra: "Kashyapa", purpose: "Clarity and peace", family: 2 },
  payment: "UPI",
};
export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dt-booking")) || initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => localStorage.setItem("dt-booking", JSON.stringify(booking)), [booking]);
  const value = useMemo(
    () => ({ booking, setBooking, update: (patch) => setBooking((b) => ({ ...b, ...patch })) }),
    [booking]
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useBooking = () => useContext(C);
