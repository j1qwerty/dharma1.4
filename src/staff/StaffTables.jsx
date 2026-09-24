// Staff → Bookings / Inquiries: same reference tables as the super-admin
// console (filters, search, booking drawer with status workflow).
import { AdminBookings, AdminInquiries } from "../admin/pages/AdminTables";

export function StaffBookings() {
  return <AdminBookings />;
}

export function StaffInquiries() {
  return <AdminInquiries />;
}
