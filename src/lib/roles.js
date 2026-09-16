// Canonical roles. Staff/admin access is granted via `admins/{uid}`;
// every `users/{uid}` carries a `role` (default: customer).
export const ROLES = {
  SUPER_ADMIN: "super-admin",
  EDITOR: "editor",
  STAFF: "staff", // legacy staff marker on users docs — treated as non-customer
  CUSTOMER: "customer",
};

export const STAFF_ROLES = [ROLES.SUPER_ADMIN, ROLES.EDITOR];

/** Roles allowed into /admin. Any admins/{uid} doc grants access today;
 *  super-admin vs editor is enforced per-action as editors arrive. */
export function canAccessAdmin(adminRole) {
  return Boolean(adminRole);
}

export function isCustomer(role) {
  return !role || role === ROLES.CUSTOMER;
}
