// Canonical roles. Staff/admin access is granted via `admins/{uid}`;
// every `users/{uid}` carries a `role` (default: customer).
//
// - super-admin → full CMS console (/admin/*)
// - admin       → staff console (/staff/*: users, bookings, inquiries)
// - editor      → reserved; treated like admin for staff access
export const ROLES = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  EDITOR: "editor",
  STAFF: "staff", // legacy staff marker on users docs — treated as non-customer
  CUSTOMER: "customer",
};

export const STAFF_ROLES = [ROLES.SUPER_ADMIN, ROLES.EDITOR, ROLES.ADMIN];

/** Roles allowed into /admin. Any admins/{uid} doc grants access today;
 *  super-admin vs editor is enforced per-action as editors arrive. */
export function canAccessAdmin(adminRole) {
  return Boolean(adminRole);
}

/** /admin (CMS console) is super-admin only. */
export function isSuperAdmin(adminRole) {
  return adminRole === ROLES.SUPER_ADMIN;
}

/** /staff console: admin, editor, or super-admin. */
export function canAccessStaff(adminRole) {
  return adminRole === ROLES.SUPER_ADMIN || adminRole === ROLES.ADMIN || adminRole === ROLES.EDITOR;
}

export function isCustomer(role) {
  return !role || role === ROLES.CUSTOMER;
}
