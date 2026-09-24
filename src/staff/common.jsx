// Shared staff-console bits: Firestore timestamp formatting.
export function fmt(v) {
  try {
    const d = v?.toDate?.() || (v ? new Date(v) : null);
    return d && !Number.isNaN(d.getTime()) ? d.toLocaleString() : "—";
  } catch {
    return "—";
  }
}
