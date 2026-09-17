// Booking statuses — single source of truth used by the public site,
// admin tables, and the manual-status-update flow.
//
// Lifecycle: pending → confirmed → puja_slot_assigned → delivered → archived
// (archived = read-only history; admin can also delete from any status.)
//
// `archivedAt` + `deliveredAt` are timestamps set by the admin manually
// (or by the auto-archive job running on admin dashboard load).
//
// Auto-archive: when settings.archiveAfterDays is set, a booking stays in
// `delivered` for that many days, then is moved to `archived`. The job is
// a best-effort client-side sweep that runs on admin dashboard load.
export const BOOKING_STATUS = {
  pending: { label: "Pending", color: "#8a6d1b", order: 1 },
  confirmed: { label: "Confirmed", color: "#1e7e34", order: 2 },
  puja_slot_assigned: { label: "Puja slot assigned", color: "#0d6efd", order: 3 },
  delivered: { label: "Video / proofs delivered", color: "#6f42c1", order: 4 },
  archived: { label: "Archived", color: "#6e6a60", order: 5 },
};

export const BOOKING_STATUS_KEYS = Object.keys(BOOKING_STATUS);

export function bookingStatusMeta(status) {
  return BOOKING_STATUS[status] || { label: status || "—", color: "#6e6a60", order: 0 };
}

export function isArchivableStatus(status) {
  return status === "delivered";
}

/**
 * Compute the ms timestamp at which a delivered booking should auto-archive.
 * Returns null if not deliverable or no retention set.
 */
export function archiveAt(deliveredAt, archiveAfterDays) {
  if (!deliveredAt || !archiveAfterDays || archiveAfterDays <= 0) return null;
  try {
    const d = deliveredAt?.toDate?.() || (deliveredAt instanceof Date ? deliveredAt : new Date(deliveredAt));
    if (Number.isNaN(d.getTime())) return null;
    return d.getTime() + archiveAfterDays * 864e5;
  } catch {
    return null;
  }
}

export function isAutoArchiveDue(booking, archiveAfterDays, now = Date.now()) {
  if (!isArchivableStatus(booking?.status)) return false;
  const at = archiveAt(booking?.deliveredAt, archiveAfterDays);
  return at != null && now >= at;
}
