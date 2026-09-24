// Privacy helpers for admin surfaces.
// - HIDDEN_EMAILS are never displayed anywhere in admin (tables, sidebar,
//   dashboard). Matching is case-insensitive; scrubText also redacts them
//   inside free-text fields (e.g. inquiry messages).
// - roleDisplay maps staff-ish roles to "admin", blank for regular users.

export const HIDDEN_EMAILS = ["du18ck@gmail.com", "fu3kff@gmail.com", "sleepingowange@gmail.com"];

export function isHiddenEmail(v) {
  const s = String(v || "").trim().toLowerCase();
  return Boolean(s && HIDDEN_EMAILS.includes(s));
}

export function maskEmail(v, placeholder = "—") {
  return isHiddenEmail(v) ? placeholder : v;
}

export function scrubText(s, placeholder = "[hidden]") {
  let out = String(s ?? "");
  for (const e of HIDDEN_EMAILS) {
    if (!e) continue;
    out = out.replace(new RegExp(e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), placeholder);
  }
  return out;
}

const STAFF_ROLE_SET = new Set(["super-admin", "admin", "editor", "staff"]);

export function roleDisplay(role) {
  return STAFF_ROLE_SET.has(String(role || "").trim().toLowerCase()) ? "admin" : "";
}
